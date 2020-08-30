import React, { useRef, useState } from "react";
import { parseCommentLine } from "./utils/CommentParser";
import styled from "styled-components";

const Main = styled.main`
  max-width: 960px;
  margin: 2em auto;
`;

const Form = styled.form`
  padding: 2em;
  background: #ccc;
  * + * {
    margin-top: 2em;
  }
  label {
    display: block;
  }
  input {
    display: block;
  }
  button {
    display: block;
  }
`;

function App() {
  const fileInput = useRef(null);
  const [commentData, setCommentData] = useState(null);

  return (
    <Main>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();

          const [file] = fileInput.current.files;
          const text = await file.text();

          setCommentData(
            text
              .split(/\r?\n/)
              .map(parseCommentLine)
              .filter((c) => c != null)
          );
        }}
      >
        <label htmlFor="file">Upload a Zoom Chat File to begin analysis</label>
        <input id="file" type="file" ref={fileInput} />
        <button type="submit">Submit</button>
      </Form>
      {commentData && (
        <>
          <DisplayStats commentData={commentData} />{" "}
          <CommentRecords commentData={commentData} />
        </>
      )}
    </Main>
  );
}

const DisplayStats = ({ commentData }) => {
  const letterGroups = ["A-F", "G-M", "N-S", "T-Z"];

  const res = letterGroups.map((x) => ({
    group: x,
    count: commentData.map((c) => c.name).filter(nameMatchesLetterGroup(x))
      .length,
  }));

  return <GroupTable groupStats={res} />;
};

const GroupTable = ({ groupStats }) => (
  <table>
    <thead>
      <tr>
        <th>Group</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      {groupStats.map((x) => (
        <tr>
          <td>{x.group}</td>
          <td>{x.count}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const CommentRecords = ({ commentData }) => (
  <div>
    <h2>Comment Data</h2>
    {commentData.map((x) => (
      <p>
        {x.name} - {x.comment}
      </p>
    ))}
  </div>
);

const nameMatchesLetterGroup = (letterGroup) => (name) => {
  const res = name.match(new RegExp(`^[${letterGroup}]`));
  return res !== null ? res.length : false;
};

export default App;
