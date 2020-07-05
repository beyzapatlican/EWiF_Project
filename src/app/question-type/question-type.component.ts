import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {PrepareSessionService} from '../../services/prepare-session.service';
import {MobileChecker} from '../../services/mobile-checker.service';
import {Session} from '../../models/session';
import {QuestionType} from '../../models/question-types/question-type.enum';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-question-type',
  templateUrl: `./question-type.component.html`,
  styleUrls: ['./question-type.component.css']
})

export class QuestionTypeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('newQuestion') questionType: ElementRef;

  selectedTF = false;
  selectedMC = false;
  selectedFree = false;
  selectedNew = true;

  title: string;

  sessionPickerOptions: Array<string> = [];

  questionTypeInited = false;


  constructor(public prepareSessionService: PrepareSessionService, public mobileChecker: MobileChecker,
              protected renderer: Renderer2) {
    this.prepareSessionService = prepareSessionService;
  }


  ngOnInit(): void {
    this.reset();
    this.getSessions();
  }

  ngAfterViewInit() {
    this.initDeviceType();
  }

  ngOnDestroy() {
    this.reset();
  }

  reset() {
    this.selectedTF = false;
    this.selectedMC = false;
    this.selectedFree = false;
    this.selectedNew = false;
    this.title = undefined;
    this.sessionPickerOptions = [];
    this.questionTypeInited = false;
    this.prepareSessionService.sessions = [];
    this.prepareSessionService.questionsTF = [];
    this.prepareSessionService.questionsMC = [];
    this.prepareSessionService.questionsFree = [];
    this.prepareSessionService.questionStrings = [];
    this.prepareSessionService.questionFormGroup = undefined;
    this.prepareSessionService.editQuestion = false;
    this.prepareSessionService.newSession = false;
    this.prepareSessionService.selectedRowNumber = -1;
    this.prepareSessionService.selectedSessionIndex = undefined;
    this.prepareSessionService.questionFormGroup = undefined;
  }


  initDeviceType() {

    this.renderer.addClass(this.questionType.nativeElement, 'col-10');

    /*if (this.mobileChecker.isMobile) {
      this.renderer.addClass(this.questionType.nativeElement, 'col-12');
    } else {
      this.renderer.addClass(this.questionType.nativeElement, 'col-10');
    }*/
    this.questionTypeInited = true;
  }

  onQuestionSelect(i: number) {
    this.saveClickedRow(i);
    if (i > this.prepareSessionService.questionStrings.length) {
      return;
    }
    if (i === this.prepareSessionService.questionStrings.length) {
      this.openNew();
      return;
    }

    const questionNum = this.prepareSessionService.questionStrings[i].questionNum;

    let found = false;
    this.prepareSessionService.questionsMC.forEach(question => {
      if (question.questionNum === questionNum) {
        found = true;

        this.prepareSessionService.questionFormGroup = new FormGroup({
          question: new FormControl(question.question),
          solution: new FormControl(question.solution),
          ans1: new FormControl(question.ans1),
          ans2: new FormControl(question.ans2),
          ans3: new FormControl(question.ans3),
          ans4: new FormControl(question.ans4),
          ans5: new FormControl(question.ans5)
        });
        this.openMC();
        return;
      }
    });
    if (!found) {
      this.prepareSessionService.questionsTF.forEach(question => {
        if (question.questionNum === questionNum) {
          found = true;

          this.prepareSessionService.questionFormGroup = new FormGroup({
            question: new FormControl(question.question),
            solution: new FormControl(question.solution),
          });
          this.openTF();
          return;
        }
      });
    }
    if (!found) {
      this.prepareSessionService.questionsFree.forEach(question => {
        if (question.questionNum === questionNum) {
          found = true;

          this.prepareSessionService.questionFormGroup = new FormGroup({
            question: new FormControl(question.question),
            solution: new FormControl(question.solution),
          });
          this.openFree();
          return;
        }
      });
    }

    // this.prepareSessionService.questionFormGroup = new FormGroup()
    if (!this.questionTypeInited) {
      this.initDeviceType();
    }
  }

  saveClickedRow(i: number) {
    this.prepareSessionService.selectedRowNumber = i;
    this.prepareSessionService.editQuestion = i < this.prepareSessionService.questionsMC.length +
      this.prepareSessionService.questionsTF.length +
      this.prepareSessionService.questionsFree.length
      && i >= 0;
  }


  openTF() {
    this.selectedTF = true;
    this.selectedMC = false;
    this.selectedFree = false;
    this.selectedNew = false;
  }

  openMC() {
    this.selectedMC = true;
    this.selectedTF = false;
    this.selectedFree = false;
    this.selectedNew = false;
  }

  openFree() {
    this.selectedFree = true;
    this.selectedTF = false;
    this.selectedMC = false;
    this.selectedNew = false;
  }

  openNew() {
    this.selectedFree = false;
    this.selectedTF = false;
    this.selectedMC = false;
    this.selectedNew = true;
  }

  onUpdate1() {
    this.prepareSessionService.prepareNewFormGroup(QuestionType.TRUE_FALSE);
    this.openTF();
  }

  onUpdate2() {
    this.prepareSessionService.prepareNewFormGroup(QuestionType.MULTIPLE_CHOICE);
    this.openMC();
  }

  onUpdate3() {
    this.prepareSessionService.prepareNewFormGroup(QuestionType.FREE_TEXT);
    this.openFree();
  }

  onUpdate4() {
    this.openNew();
    this.clearQuestionSelection();
  }

  clearQuestionSelection() {
    this.saveClickedRow(-1);
  }

  onNewSessionSelection() {
    this.prepareSessionService.clearQuestions();
    this.onUpdate4();
    this.prepareSessionService.newSession = true;
    this.title = '';
    this.prepareSessionService.sessions.push(new Session('Neu', 'new'));
    this.prepareSessionService.selectedSessionIndex = this.prepareSessionService.sessions.length - 1;
    this.saveClickedRow(0);
  }

  getSessions() {
    this.prepareSessionService.getAllSessions().subscribe(response => {
      response.sessions.forEach(session => {
        this.prepareSessionService.sessions.push(session);
        this.sessionPickerOptions = [...this.sessionPickerOptions, session.name];
      });
    });
  }

  onSessionSelect() {
    if (this.prepareSessionService.newSession) {
      this.prepareSessionService.newSession = false;
      this.prepareSessionService.sessions = this.prepareSessionService.sessions.filter(session => session.sessionID !== 'new');
    }
    this.saveClickedRow(-1);
    const session = this.prepareSessionService.sessions[this.prepareSessionService.selectedSessionIndex];
    this.getQuestions(session.sessionID);
    this.title = session.name;
  }

  getQuestions(pin: string) {
    this.prepareSessionService.getAllQuestions(pin).subscribe(questions => {
      this.prepareSessionService.clearQuestions();
      if (questions.Free != null) {
        this.prepareSessionService.questionsFree = questions.Free;
        this.prepareSessionService.questionsFree.forEach(question => this.prepareSessionService.questionStrings.push({
          questionNum: question.questionNum, questionString: question.question
        }));
      }
      if (questions.MultipleChoice != null) {
        this.prepareSessionService.questionsMC = questions.MultipleChoice;
        this.prepareSessionService.questionsMC.forEach(question => this.prepareSessionService.questionStrings.push({
          questionNum: question.questionNum, questionString: question.question
        }));
      }
      if (questions.TrueFalse != null) {
        this.prepareSessionService.questionsTF = questions.TrueFalse;
        this.prepareSessionService.questionsTF.forEach(question => this.prepareSessionService.questionStrings.push({
          questionNum: question.questionNum, questionString: question.question
        }));
      }
      questions.TrueFalse.sort((q1, q2) => {
        if (q1.questionNum > q2.questionNum) {
          return 1;
        } else if (q1.questionNum === q2.questionNum) {
          return 0;
        } else {
          return -1;
        }
      });
      questions.Free.sort((q1, q2) => {
        if (q1.questionNum > q2.questionNum) {
          return 1;
        } else if (q1.questionNum === q2.questionNum) {
          return 0;
        } else {
          return -1;
        }
      });
      questions.MultipleChoice.sort((q1, q2) => {
        if (q1.questionNum > q2.questionNum) {
          return 1;
        } else if (q1.questionNum === q2.questionNum) {
          return 0;
        } else {
          return -1;
        }
      });
      this.prepareSessionService.questionStrings.sort((q1, q2) => {
        if (q1.questionNum > q2.questionNum) {
          return 1;
        } else if (q1.questionNum === q2.questionNum) {
          return 0;
        } else {
          return -1;
        }
      });
    });
  }

  saveSession() {
    const request = this.prepareSessionService.prepareRequest(
      this.prepareSessionService.questionsTF,
      this.prepareSessionService.questionsFree,
      this.prepareSessionService.questionsMC,
      this.title);

    this.prepareSessionService.sendRequest(request).subscribe(response => {
      if (!this.prepareSessionService.newSession) {
        this.prepareSessionService.postDeleteSession(this.prepareSessionService.sessions[this.prepareSessionService.selectedSessionIndex].sessionID).subscribe(value => {
          this.refresh();
        }, error => 'look idc anymore');
      } else {
        this.refresh();
      }
    });
  }

  refresh(): void {
    window.location.reload();

  }

  goBack(): void {
    window.history.back();
  }
}
