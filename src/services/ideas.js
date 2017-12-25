import * as Api from './api/gateway';
import {refreshTokenHandler} from "./auth";

const createIdea = (data) =>
  refreshTokenHandler(Api.post, Api.Resources.ideas, data);

const updateIdea = ({id, created_at, average_score, ...data}) =>
  refreshTokenHandler(Api.put, Api.Resources.ideas, id, data);

const deleteIdea = ({id}) =>
  refreshTokenHandler(Api.deleteResource, `${Api.Resources.ideas}/${id}`);

const getIdeas = (page) =>
  refreshTokenHandler(Api.get, Api.Resources.ideas, {page});

export {
  createIdea,
  updateIdea,
  deleteIdea,
  getIdeas,
}
