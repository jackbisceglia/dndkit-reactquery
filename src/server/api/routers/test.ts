import { createTRPCRouter, publicProcedure } from "../trpc";

import { z } from "zod";

type Obj = {
  id: string;
  name: string;
};

const stockObjects: { obj: Obj }[] = [
  {
    obj: {
      id: "e3828665-a96d-472a-9d46-485ec91927b4",
      name: "Apple",
    },
  },
  {
    obj: {
      id: "84654427-6577-4b08-b47d-b22956e0877f",
      name: "Orange",
    },
  },
  {
    obj: {
      id: "0981ccaf-bd0c-47ae-89b4-a563e22c9da7",
      name: "Banana",
    },
  },
  {
    obj: {
      id: "640e3879-e86b-4235-a59a-15de9b6b5013",
      name: "Mango",
    },
  },
  {
    obj: {
      id: "5436d24d-aac0-4bad-ab2e-949dc66d008f",
      name: "Pineapple",
    },
  },
  {
    obj: {
      id: "640j3879-e86b-4235-a59a-15de9b6b5013",
      name: "Mango",
    },
  },
  {
    obj: {
      id: "5436d24d-abc0-4bad-ab2e-949dc66d008f",
      name: "Pineapple",
    },
  },
];
export const testRouter = createTRPCRouter({
  getStockData: publicProcedure.query(({ input }) => {
    return stockObjects;
  }),
});
