import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class RentalImageComponent extends Component {
  @action guess(e) {
    e.preventDefault();
    const formData = new FormData(e.target).entries();
    for (const val of formData) {
      console.log(val[1]);
    }
  }
}
