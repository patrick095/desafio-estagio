import { FormControl } from '@angular/forms';

export interface Cadastro {
   id: FormControl<number | null>;
   brandId: FormControl<number | null>;
   modelId: FormControl<number | null>;
   processor: FormControl<string | null>;
   memory: FormControl<string | null>;
   screen: FormControl<string | null>;
   storage: FormControl<string | null>;
   newDevice: FormControl<boolean | null>;
   description: FormControl<string | null>;
}
