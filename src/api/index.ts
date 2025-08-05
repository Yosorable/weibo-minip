export interface HotItem {
  url: string;
  title: string;
  index: number;
  readNumber: number;
  tag?: string;
}

export const Api = {
  getHotList() {
    // return fetch("https://s.weibo.com/top/summary?cate=realtimehot", {
    //   headers: {
    //     accept:
    //       "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    //     "accept-language": "zh-CN,zh;q=0.9",
    //     priority: "u=0, i",
    //     "sec-fetch-dest": "document",
    //     "sec-fetch-mode": "navigate",
    //     "sec-fetch-site": "same-origin",
    //     "sec-fetch-user": "?1",
    //     "upgrade-insecure-requests": "1",
    //   },
    //   referrer: "https://s.weibo.com/top/summary?cate=topicband",
    //   referrerPolicy: "strict-origin-when-cross-origin",
    //   body: null,
    //   method: "GET",
    //   mode: "cors",
    //   credentials: "include",
    // })

    // return fetch("miniprequest://", {
    //   body: JSON.stringify({
    //     url: "https://s.weibo.com/top/summary?cate=realtimehot",
    //     headers: {
    //       accept:
    //         "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    //       "accept-language": "zh-CN,zh;q=0.9",
    //       priority: "u=0, i",
    //       "sec-fetch-dest": "document",
    //       "sec-fetch-mode": "navigate",
    //       "sec-fetch-site": "same-origin",
    //       "sec-fetch-user": "?1",
    //       "upgrade-insecure-requests": "1",
    //       cookie:
    //         "SUB=_2AkMQCMgEf8NxqwFRmf0WyGLnbYxyyg_EieKmVDnfJRMxHRl-yT9kqhYTtRB6O4jm67GaOcmm-3hjX4xBfYdYpSFxZUfa; SUBP=0033WrSXqPxfM72-Ws9jqgMF55529P9D9WWEalq6dmncPZfGsJ0cyQr4; _s_tentry=passport.weibo.com; Apache=1002614717760.4238.1733576500738; SINAGLOBAL=1002614717760.4238.1733576500738; ULV=1733576500749:1:1:1:1002614717760.4238.1733576500738:; UOR=,,www.baidu.com",
    //       Referer: "https://s.weibo.com/top/summary?cate=topicband",
    //       "Referrer-Policy": "strict-origin-when-cross-origin",
    //     },
    //     body: null,
    //     method: "GET",
    //   }),
    //   method: "POST",
    // })

    return fetch("miniphttps://s.weibo.com/top/summary?cate=realtimehot", {
      method: "GET",
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "zh-CN,zh;q=0.9",
        priority: "u=0, i",
        "minip-sec-fetch-dest": "document",
        "minip-sec-fetch-mode": "navigate",
        "minip-sec-fetch-site": "same-origin",
        "minip-sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "minip-cookie":
          "SUB=_2AkMQCMgEf8NxqwFRmf0WyGLnbYxyyg_EieKmVDnfJRMxHRl-yT9kqhYTtRB6O4jm67GaOcmm-3hjX4xBfYdYpSFxZUfa; SUBP=0033WrSXqPxfM72-Ws9jqgMF55529P9D9WWEalq6dmncPZfGsJ0cyQr4; _s_tentry=passport.weibo.com; Apache=1002614717760.4238.1733576500738; SINAGLOBAL=1002614717760.4238.1733576500738; ULV=1733576500749:1:1:1:1002614717760.4238.1733576500738:; UOR=,,www.baidu.com",
        Referer: "https://s.weibo.com/top/summary?cate=topicband",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
    })
      .then((res) => res.text())
      .then((html) => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(html, "text/html");
        const section = dom.querySelector(".list_a");
        const res: Array<HotItem> = [];
        if (!section) return res;

        section.querySelectorAll("li").forEach((ele) => {
          const idxS = ele.querySelector(".hot")?.textContent;
          if (!idxS) return;
          const title = ele.querySelector("span")?.firstChild?.textContent;
          const readNumberS = ele.querySelector("em")?.textContent;
          let urlB = ele.querySelector("a")?.href;
          const sp = urlB?.split("//");
          if (sp && sp?.length > 1) {
            urlB = sp[sp?.length - 1];
          }

          const baseUrl = "https://s.weibo.com";
          const item: HotItem = {
            url: urlB ? baseUrl + urlB : "",
            title: title ?? "",
            index: parseInt(idxS ?? "-1"),
            readNumber: parseInt(readNumberS ?? "-1"),
          };
          if (
            Number.isNaN(item.readNumber) &&
            readNumberS?.split(" ").length === 2
          ) {
            item.readNumber = parseInt(readNumberS?.split(" ")[1]);
            item.tag = readNumberS?.split(" ")[0];
          }
          if (
            item.index !== -1 &&
            !Number.isNaN(item.index) &&
            item.url !== "" &&
            item.title !== "" &&
            !Number.isNaN(item.readNumber) &&
            item.readNumber !== -1
          )
            res.push(item);
        });
        console.log(res);
        return res;
      });
  },
};
