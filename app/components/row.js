import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class RowComponent extends Component {
  @action guess(e) {
    e.preventDefault();
    const formData = new FormData(e.target).entries();
    for (const [key, val] of formData) {
      console.log(key, val);
    }
  }
}
