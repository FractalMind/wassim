import {FormControl} from "@angular/forms";


export function validateWeekPassword(control: FormControl) {
  if (control.value != null &&
    !control.value.match('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')) {
    return {weekPassword: true}
  }
  return null;
}
