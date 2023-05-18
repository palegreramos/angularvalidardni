import { FormControl } from '@angular/forms';

export function DniValidator(dni: FormControl) {

    const validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
    const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    const str = dni.value.toString().toUpperCase();	
    if (nifRexp.test(str)) {
        let letra = str.charAt(8);
        let valor=parseInt(str.substr(0, 8));
        let charIndex = valor % 23;
        if (validChars.charAt(charIndex) === letra) 
          return null;
        else 
        return { invalidDni: ` La letra del DNI es incorrecta`};
    } 
    return {invalidDni: `Formato del DNI incorrecto`}
    
  
}