// const host_base = "https://www.v2ex.com/api/";
const host_base = "http://localhost:8080";

const _encodeURL = (obj) => (
  Object.keys(obj).map(item => (
    encodeURIComponent(item) + '=' + encodeURIComponent(obj[item])
  ))
)

const queryFriendListVOUrl = (obj) => ( host_base + "/user/" + obj.openId + "/allFriendListVO");
const addFriendListUrl = (obj) => (host_base + "/user/friends");
const incrContactUrl = (obj) => (host_base + "/user/friend/record");
const queryLatestContactUrl = (obj) => (host_base + "/user/" + openId + "/latestContact");

module.exports = {
  queryFriendListVOUrl,
  addFriendListUrl,
  incrContactUrl,
  queryLatestContactUrl
}