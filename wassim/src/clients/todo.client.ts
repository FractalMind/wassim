import { Client } from "./base/client";
import {TodoDto} from "../dtos/todo.dto";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {TodoInterface} from "../interfaces/todo.interface";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class TodoClient extends Client {

}
