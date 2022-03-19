import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class BoxComponent extends Component {
  @action input(e) {
    console.log(e.target.nextElementSibling);
    if (e.target.value.match(/[a-z]/i)) {
      e.target.value = e.target.value.toUpperCase();
      e.target.nextElementSibling.focus();
    } else {
      e.target.value = '';
    }
  }

  @action prev(e) {
    e.target.value = '';
    if (e.key === 'Backspace') e.target.previousElementSibling.focus();
  }
}
