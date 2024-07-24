const { faker } = require("@faker-js/faker");
const { v7: uuid } = require("uuid");

const generateRandomData = () => {
  const users = [];

  for (let i = 0; i < 10; i++) {
    users.push({
      id: uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      company: faker.company.name(),
      jobTitle: faker.person.jobTitle(),
      createdAt: faker.date.past(),
    });
  }

  return users;
};

const getDashboardData = async (req, res) => {
  try {
    const dashboardData = generateRandomData();
    res.status(200).json(dashboardData);
  } catch (err) {
    console.log({ err });
    res.status(500).json(err);
  }
};

module.exports = { getDashboardData };
