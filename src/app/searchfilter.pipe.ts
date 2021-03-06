import { Pipe, PipeTransform } from '@angular/core';
import {User} from "./entities/user";

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(Users: User[], searchValue: string): User[] {
    if(!Users || !searchValue){
      return Users;
    }
    return Users.filter(user =>
      user.displayName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
  }

}
