import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;



//Register Token
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWNlMmEzYWI0YThmYmY2NmRlYjhiYSIsImlhdCI6MTcyMTU1NzY2N30.SypSCxNEkK_4h7cPkrPzbimXY27bnPGVrfDQ1M_O2sU


// {
//     "name": "IslamSoliman",
//     "email": "islam.soliman@gmail.com",
//     "password": "12345678"
//   }
  


//login Token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWNlMmEzYWI0YThmYmY2NmRlYjhiYSIsImlhdCI6MTcyMTU2NDE5N30.vgWVMmOsfn5wv7Eu96B-t6by8NuEfKUR-9-AaCnFwm8