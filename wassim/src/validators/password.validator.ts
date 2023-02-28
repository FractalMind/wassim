import {FormControl} from "@angular/forms";


export function validatePassword( control: FormControl ){
  if( control.value != null && control.value.includes('caca') ) {
    return { badCaca: true }
  }
  return null;
}


export async function validateCredentials  ( control: FormControl ) {
  await setTimeout( () => {}, 3000);
  if( control.value != null && control.value.includes('pipi') ) {
    return { serverBadPassword: true};
  }
  return null;
}
