import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useState} from "react";

const schema = yup.object({
  userName: yup.string().required("*Input username!").min(4),
  email: yup.string().required("*Input email!").matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", "Please, input valid email !"),
  password: yup.string()
      .required("*Input password!")
      .matches("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$", "Need a stronger password"),
  date: yup.date().required("*Choose a date!").min(new Date(), "Date must be latter than 09.09.2022!"),
  showAnotherInput: yup.boolean(),
  anotherInput: yup.string().when("showAnotherInput", {
    is: true,
    then: yup.string().required().min(4, "Min 4 chars")
  })
})

function App() {
  const [isClose, setIsClose] = useState(true);

  const {handleSubmit, register, formState:{errors}} = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => console.log(data)



  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("userName")}/>
        <p>{errors.userName?.message}</p>
        <input {...register("email")}/>
        <p>{errors.email?.message}</p>
        <input type="password" {...register("password")}/>
        <p>{errors.password?.message}</p>
        <input type="date" {...register("date")}/>
        <p>{errors.date?.message}</p>
        <input type="checkbox" {...register("showAnotherInput")} placeholder="AnotherInput" onInput={() => setIsClose(!isClose)}/>
        <input type="text" {...register("anotherInput")} style={{display: isClose ? "none": "block"}}/>
        <p>{errors.anotherInput?.message}</p>
        <button type="submit">Check</button>
      </form>
    </div>
  );
}

export default App;
