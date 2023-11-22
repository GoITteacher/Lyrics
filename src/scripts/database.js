import axios from "axios";
const password = prompt("Enter password");
const axios2 = axios.create({
  baseURL: "https://lr6q6s5yl4.execute-api.us-east-2.amazonaws.com/dev/records",
  params: {
    API_KEY: password,
  },
});

export class LyricsDB {
  static list = [];

  static async getRecords() {
    const res = await axios2.get();
    return res.data;
  }

  static async getRecord(id) {
    const res = await axios2.get(`/${id}`);
    localStorage.setItem("item", JSON.stringify(res.data));
    return res.data;
  }

  static async saveLyrics(obj) {
    const res = await axios2.post("", obj);
    const { id, name } = res.data;
    const item = { id, name };
    LyricsDB.updateList(item);
    return res.data;
  }

  static async updateItem(obj) {
    const res = await axios2.patch("", obj);
    const { id, name } = res.data;
    const item = { id, name };
    this.updateList(item);
    return res.data;
  }

  static async getList() {
    const res = await axios2.get("/MyList");
    LyricsDB.list = res.data.lyrics.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    return res.data;
  }

  static async updateList(item) {
    LyricsDB.list.push(item);
    axios2.put("", LyricsDB.list);
  }

  static async deleteRecord(id) {
    LyricsDB.list = LyricsDB.list.filter((el) => el.id !== id);
    axios2.put("", LyricsDB.list);
    const res = await axios2.delete(`/${id}`);
    return res.data;
  }
}
