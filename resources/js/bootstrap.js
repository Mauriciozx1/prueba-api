import _ from 'lodash';
import 'bootstrap';
import axios from 'axios';
import * as Popper from '@popperjs/core'

window.Popper = Popper
window._ = _;
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
//Crear el header con que sera igual a 'prueba'
window.axios.defaults.headers.common['x-ccloud-auth'] = 'prueba';

window.axios.defaults.withCredentials = true;
