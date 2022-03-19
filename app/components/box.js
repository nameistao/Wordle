import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class BoxComponent extends Component {
  @action input(e) {
    console.log(e.target.value);
    if (e.target.value.match(/[a-z]/i)) {
      e.target.value = e.target.value.toUpperCase();
    } else {
      e.target.value = '';
    }
  }
}
