import { useEffect, useState } from "react";
import header from "./assets/header.jpg";
import { Api, HotItem } from "./api";
import {
  enablePullDownRefresh,
  openWebsite,
  stopPullDownRefresh,
} from "minip-bridge";

function App() {
  const [list, setList] = useState<Array<HotItem>>([]);
  const [_, setMsg] = useState<string | null>(null);

  function refreshData(isFirst: boolean = false) {
    return Api.getHotList()
      .then((res) => {
        setList(res);
      })
      .catch((err) => {
        setMsg(err.message ?? "error");
      })
      .finally(() => {
        stopPullDownRefresh();
        if (isFirst) {
          window.addEventListener("pulldownrefresh", () => {
            refreshData();
          });
          enablePullDownRefresh();
        }
      });
  }
  useEffect(() => {
    refreshData(true);
  }, []);

  return (
    <>
      <div>
        <img
          style={{
            width: "100%",
          }}
          src={header}
          alt=""
        />
      </div>
      <div>
        {list.map((item) => (
          <div
            onClick={() => {
              openWebsite(item.url);
            }}
            className="item"
          >
            <strong className="hot">{item.index}</strong>
            <span>
              {item.title} <em className="read">{item.readNumber}</em>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
