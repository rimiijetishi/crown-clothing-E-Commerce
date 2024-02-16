import { FormInputLabel, Input, Group } from './form-input.style'

const FormInput = ({ label, ...otherProps}) => {
  return (
    <Group>
      <Input {...otherProps}/>
      {label && (
        <FormInputLabel 
          className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;