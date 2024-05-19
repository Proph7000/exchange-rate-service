module.exports = {
  async up(db, client) {
    await client.db('exchange-rate');

    await client.db('exchange-rate').collection('subscribers').insertOne({ email: "test@example.com" });
  },

  async down(db, client) {
    await client.db('exchange-rate').collection('subscribers').drop();
  }
};
