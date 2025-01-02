const models = require("../../models");
const { v4: uuidv4 } = require("uuid");
const passwordHash = require("password-hash");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const data = require("../../data");
const Op = Sequelize.Op;
const https = require('https'); // or 'https' for https:// URLs
const Login = async (req, res, next) => {
  if (!req.body.username)
    return res.status(500).json({ message: "invalid body" });
  if (!req.body.password)
    return res.status(500).json({ message: "invalid body" });

  let data = await models.Admin.findOne({
    where: { username: req.body.username },
  });

  if (!data) {
    return res.status(422).json({ status: 422, message: "user not found" });
  }

  // check password match with user password
  if (!passwordHash.verify(req.body.password, data.password)) {
    return res.status(404).json({ status: 404, message: "invalid password" });
  }
  delete data.password;
  // create token
  console.log(data);
  let token = jwt.sign(
    { id: data.id, source: "admin", role: data.role },
    process.env.JWT_SECRET,
    {}
  );
  res.json({
    message: "success",
    user: data,
    token,
  });
};

const Users = async (req, res, next) => {
  try {
    let users = await models.User.findAll();

    res.json({
      message: "success",
      user: users,
    });
  } catch (e) {
    next(e);
  }
};

const createAdmin = async (req, res, next) => {
  let password = passwordHash.generate("bank@1234");
  try {
    let user = await models.Admin.create({
      id: uuidv4(),
      username: "bank980",
      password: password,
      email: "ban@gmail.com",
      active: true,
    });

    res.json({
      message: "success",
      user: user,
    });
  } catch (e) {
    next(e);
  }
};

const syncData = async (req, res, next) => {
  try {
    let did = await models.Did.findAll();
    // fs.readFile('./data.js', 'utf8', (err, data) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   let parsedData = JSON.parse(data)
    //   console.log(parsedData);

    // });
    console.log(data.data);
    data.data.forEach(async (thisLocation) => {
      await models.Did.create({
        id: uuidv4(),
        country: "Germany",
        alpha2Code: "de",
        countryCode: "+49",
        localArea: thisLocation.Ortsnetzname,
        areaCode: thisLocation.Ortsnetzkennzahl,
      });
      console.log("inserted");
    });
    res.json({
      message: "success",
      did: did,
    });
  } catch (e) {
    next(e);
  }
};
const searchPhoneNumbers = async (req, res, next) => {
  try {
    console.log(req.params.query);
    let searchText = req.params.query.toLowerCase();
    let did = await models.PhoneNumbers.findAll({
      where: {
        [Op.or]: [
          {
            areaName: Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("areaName")),
              "LIKE",
              "%" + searchText + "%"
            ),
          },
          {
            cityName: Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("cityName")),
              "LIKE",
              "%" + searchText + "%"
            ),
          },
          {
            countryName: Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("countryName")),
              "LIKE",
              "%" + searchText + "%"
            ),
          },
          {
            countryCode: {
              [Op.like]: `%${req.params.query}%`,
            },
          },
        ],
      },
    });
    
    let toSendRes = did.reduce((accumulator, current) => {
      // console.log(current.numberType)

      if (accumulator[current.countryName]) {
        if(accumulator[current.countryName]['area'][current.numberType]){ 
          accumulator[current.countryName]['area'][current.numberType].push(current);
        }else{ 
          accumulator[current.countryName]['area'][current.numberType] = []
          accumulator[current.countryName]['area'][current.numberType].push(current);
        }
      } else {
        accumulator[current.countryName] = {
          isoCode:current.countryIso
        };
        accumulator[current.countryName]['area'] = {}
        accumulator[current.countryName]['area'][current.numberType] = []
        accumulator[current.countryName]['area'][current.numberType].push(current);
      }
      return accumulator;
    }, {});
    res.json({
      message: "success",
      // count:did.length,
      did: toSendRes,
      // res:did
    });
  } catch (e) {
    next(e);
  }
};


const searchDid = async (req, res, next) => {
  try {
    console.log(req.params.query);
    let searchText = req.params.query.toLowerCase();
    let did = await models.Did.findAll({
      where: {
        [Op.or]: [
          {
            localArea: Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("localArea")),
              "LIKE",
              "%" + searchText + "%"
            ),
          },
          {
            country: Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("country")),
              "LIKE",
              "%" + searchText + "%"
            ),
          },
          {
            areaCode: {
              [Op.like]: `%${req.params.query}%`,
            },
          },
        ],
      },
    });
    // let response = []
    let toSendRes = did.reduce((accumulator, current) => {
      if (accumulator[current.country]) {
        accumulator[current.country].push(current);
      } else {
        accumulator[current.country] = [];
        accumulator[current.country].push(current);
      }

      return accumulator;
    }, {});
    res.json({
      message: "success",
      did: toSendRes,
    });
  } catch (e) {
    next(e);
  }
};

const createCountryEntry = async (country) => {
  console.log(country);
  let createdCountry = await models.Countries.create({
    id: uuidv4(),
    name: country.countryName,
    iso: country.countryIso,
    countryCode: country.prefix,
    description: country.description,
  });
  let phoneNumbers = country.prefixes;
  console.log(phoneNumbers, "Create");
  Object.keys(phoneNumbers).forEach(async (numberType) => {
    console.log(numberType, "numberTypenumberTypenumberType");
    let thisTypeNumbers = phoneNumbers[numberType];
    thisTypeNumbers.forEach(async (numberData) => {
      await models.PhoneNumbers.create({
        id: uuidv4(),
        countryId: createdCountry.id,
        countryName:country.countryName,
        countryIso:country.countryIso,
        areaName: numberData.areaName,
        cityName: numberData.cityName,
        numberType: numberType,
        prefix: numberData.prefix,
        countryCode:country.prefix,
        hasA2p: numberData.hasA2p,
        hasEmergency: numberData.hasEmergency,
        hasP2p: numberData.hasP2p,
        hasSms: numberData.hasSms,
        hasT38: numberData.hasT38,
        hasVoice: numberData.hasVoice,
        hasVoiceOut: numberData.hasVoiceOut,
      });
    });
  });
};

const addCountry = (req, res, next) => {
  try {
    fs.readdir('./countries', (err, files) => {
      files.forEach(file => {
        console.log(file);
        fs.readFile(`./countries/${file}`,{ encoding: "utf-8" },function (err, data) {
        if (!err) {
          let parsedData = JSON.parse(data);
          let countryData = parsedData.pageProps.countryInfo;
          createCountryEntry(countryData);
        } else {
          console.log(err);
        }
      }
    );
      });
    });
    
    res.send("asd");
  } catch (e) {
    next(e);
  }
};

const downloadFlag = (iso) => { 
  iso = iso.toLowerCase()
  const file = fs.createWriteStream(`./assets/flags/${iso}.svg`);
  const request = https.get(`https://hatscripts.github.io/circle-flags/flags/${iso}.svg`, function(response) {
     response.pipe(file);
  
     // after download completed close filestream
     file.on("finish", () => {
         file.close();
         console.log("Download Completed");
     });
  });
}

const getCountryFlags = (req, res, next) => {
  try {
    fs.readdir('./countries', (err, files) => {
      files.forEach(file => {
        console.log(file);
        files.forEach(file => {
          console.log(file);
          fs.readFile(`./countries/${file}`,{ encoding: "utf-8" },function (err, data) {
          if (!err) {
            let parsedData = JSON.parse(data);
            let countryData = parsedData.pageProps.countryInfo;
            downloadFlag(countryData.countryIso)
          } else {
            console.log(err);
          }
        }
      );
        });
      });
    });
    
    res.send("asd");
  } catch (e) {
    next(e);
  }
};

module.exports = {
  Login,
  Users,
  createAdmin,
  syncData,
  searchDid,
  addCountry,
  searchPhoneNumbers,
  getCountryFlags
};
