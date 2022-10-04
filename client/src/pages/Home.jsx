import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`videos/${type}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [type]);
  return (
    <Container>
      {videos.map((video) => {
        return <Card key={video._id} video={video} />;
      })}
    </Container>
  );
};

export default Home;
