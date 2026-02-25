// hooks/UseUser.js
import { useContext, useEffect, useRef, useCallback } from "react";
import { UserContext } from "../user.context";
import { FetchMyfolloing, FetchMyfollowers, Fetchotheruser } from "../services/user.api";

const UseUser = () => {
  const { followers, setFollowers, following, setFollowing, other, setOther } = useContext(UserContext);
  const firstLoad = useRef(true);


  const fetchMyFollowers = useCallback(async () => {
    try {
      const res = await FetchMyfollowers(1, 10);
      setFollowers(res.followers);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchMyfollowing = useCallback(async () => {
    try {
      const res = await FetchMyfolloing(1, 10);
      setFollowing(res.following);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchOtherUser = useCallback(async () => {
    try {
      const res = await Fetchotheruser(1, 10);
      setOther(res.users);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (!firstLoad.current) return;
    firstLoad.current = false;
    fetchMyFollowers();
    fetchMyfollowing();
    fetchOtherUser();
  }, [fetchMyFollowers, fetchMyfollowing, fetchOtherUser]);
  return { followers, following, other,fetchOtherUser };
};

export default UseUser;