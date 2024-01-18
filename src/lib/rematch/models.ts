import { authModel } from "@/features/auth/model";
import { Models } from "@rematch/core";

// The root model of the rematch's store
export interface RootModel extends Models<RootModel> {
  auth: typeof authModel;
}

// Entry point for all the rematch's models in the application
export const models: RootModel = {
  auth: authModel,
};
