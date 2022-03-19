import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class GridComponent extends Component {
  @tracked word;
  @tracked curLine;

  constructor() {
    super(...arguments);

    const wordList = ['crane', 'acorn', 'train', 'hippo'];
    this.word = wordList[3];
    this.lines = [1, 2, 3, 4, 5, 6];
    this.curLine = 1;
  }
}
