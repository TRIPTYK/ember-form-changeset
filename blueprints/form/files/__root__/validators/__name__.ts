<%= validationFormatted.length ? 'import { validatePresence } from "ember-changeset-validations/validators";' : '' %>

const <%= camelizedModuleName %>Validator = <%= validationFormatted.length ? validationFormatted : '{}' %>;
 

export default <%= camelizedModuleName %>Validator;