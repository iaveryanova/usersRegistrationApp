const REQUIRED_FIELD = 'Required to fill';

export const loginValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.match(/[а-яА-Я]/)) {
            return 'Login cannot contain Russian letters'
        }

        return true;
    }
};

export const passwordValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        return true;
    }
};

export const emailValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if (value.match(/\S+@\S+\.\S+/)) {
           return true; 
        }
        return 'Email is invalid'
    }
};