import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class GridComponent extends Component {
  @tracked word;
  @tracked lines;

  constructor() {
    super(...arguments);

    const wordList = ['crane', 'acorn', 'train', 'hippo'];
    this.word = wordList[3];
    this.lines = [false, true, true, true, true, true];
  }
}
