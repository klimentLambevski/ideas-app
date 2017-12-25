const validators = {
  required: (val) => {
    return !!val;
  },
  email: (val) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val.toLowerCase());
  },
  password: (val) => {
    let re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/g;
    return re.test(val);
  }
};

const validateForm = (values, validation) => {
  let valid = true;
  let errors = {};
  _.each(values, (val, key) => {
    _.each(validation[key], (valConfig) => {
      if(!errors[key] && !valConfig.validator(val)) {
        console.log(val, valConfig.validator(val));
        errors[key] = valConfig.message;
        valid = false;
      }
    });

    if(!errors[key]) {
      errors[key] = null
    }
  });

  return {
    errors,
    valid
  }
};

export {
  validators,
  validateForm
}
