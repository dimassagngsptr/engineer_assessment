import { useState } from "react";
import { DateRange } from "react-date-range";
import Header from "../../components/header";
import { useSelector } from "react-redux";
import Task from "../../components/task";

const Home = () => {


  const { data: user } = useSelector((state) => state.user);
  return (
    <section className="bg-gray-50 min-h-screen py-10">
      <Header name={user?.user?.name} />
      <Task  user={user?.user} />
    </section>
  );
};
export default Home;
