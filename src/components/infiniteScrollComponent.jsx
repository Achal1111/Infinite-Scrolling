import { useEffect, useState } from "react";
import ShowTitle from "./showTitle";

const InfiniteScroll = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  //call the api when page changes
  const getData = async () => {
    try {
      setLoading(true);
      await fetch(
        `https://openlibrary.org/search.json?q=the+lord+of+the+rings&page=${page}`
      )
        .then((response) => response.json())
        .then((data) => setData((prev) => [...prev, ...data.docs]));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //this will get triggered when ever you scroll
  const handleScroll = () => {
    if (
      document.documentElement.scrollTop + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    getData();
  }, [page]);

  console.log(loading);

  return (
    <div>
      {data.map((ele, index) => (
        <div key={index}>
          <ShowTitle title={ele.title} />
        </div>
      ))}
      {loading && <div>Loading....</div>}
    </div>
  );
};
export default InfiniteScroll;
