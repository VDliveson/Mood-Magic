import React, { useContext } from "react";
import LoadingBar from "react-top-loading-bar";
import MovieContext from "../context/movie/movieContext";

export default function TopLoader() {
  const context = useContext(MovieContext);
  const { progress, setProgress } = context;

  return (
    <div>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    </div>
  );
}
