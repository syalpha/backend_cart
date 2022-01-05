const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },
    // productsId: {
    //     type: String,
    //     required: true
    // },

    quantity: {
        type: Number,
        default: 1,
    },

   amount: {
       type: Number,
       required: true
   },
   address: {
    type: Object,
    required: true
  },

   status: {
    type: String,
    default: 'pending'
  },

  imglogo: {
    type: String,
    default: 'pending'
  },

  note: {
    type: String,
  },
},
    { timestamps: true }
);


module.exports = mongoose.model("Order", OrderSchema);


    