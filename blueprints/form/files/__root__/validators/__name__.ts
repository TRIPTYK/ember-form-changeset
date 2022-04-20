<%= validationFormatted.length ? 'import { validatePresence } from "ember-changeset-validations/validators";' : '' %>
import { <%= classifiedModuleName %>DTO } from '<%= dummy ? "dummy" : project.pkg.name %>/components/<%= dasherizedModuleName %>/component';

const <%= camelizedModuleName %>Validator = {
    <%= validationFormatted.length ? validationFormatted : '' %>
} as Record<keyof <%= classifiedModuleName %>DTO, unknown>;
 

export default <%= camelizedModuleName %>Validator;