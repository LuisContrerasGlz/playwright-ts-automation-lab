import { test, expect } from "@playwright/test";
import { Market, User, Currency} from "../types/";
import marketJson from "../data/market.json" with { type: "json" };
import userJson from "../data/users.json" with { type: "json" };

const markets = marketJson as Market[];
const users = userJson as User[];

const standardUser = users.find((user) => user.username === "standard_user");

//Guard Clause to ensure that the standard user is found in the users.json file
if (!standardUser) {
  throw new Error("Standard user not found in users.json");
}
