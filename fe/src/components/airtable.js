var Airtable = require("airtable");
var base = new Airtable({ apiKey: "keygKHhjbCGBdYajk" }).base(
  "app2rePfeFD3Ltom9"
);

const airtable = (data) => {
  base("User Entries").create(
    [
      {
        fields: data,
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log(record.getId());
      });
    }
  );
};

export default airtable;
