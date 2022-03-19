import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class RowComponent extends Component {
  @tracked boxes;

  constructor() {
    super(...arguments);
    this.boxes = [0, 1, 2, 3, 4];
  }

  @action guess(e) {
    e.preventDefault();
    const formData = new FormData(e.target).entries();
    for (const [key, val] of formData) {
      console.log(key, val);
    }
  }
}
