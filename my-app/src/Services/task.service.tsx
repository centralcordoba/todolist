import http from "../Configuration/http-common";
import { ITask } from "../Interfaces";

class TaskDataService {
  getAll() {
    return http.get<Array<ITask>>("/todotask");
  }

  get(id: string) {
    return http.get<ITask>(`/todotask/${id}`);
  }

  create(data: ITask) {
    return http.post<ITask>("/todotask", data);
  }

  update(data: ITask, id: any) {
    return http.put<any>(`/todotask/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/todotask/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/todotask`);
  }

  findByTitle(title: string) {
    return http.get<Array<ITask>>(`/todotask?title=${title}`);
  }
}

export default new TaskDataService();