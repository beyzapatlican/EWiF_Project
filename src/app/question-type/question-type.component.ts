import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {TrueFalse} from '../../models/question-types/true-false.model';
import {Free} from '../../models/question-types/free.model';
import {MultipleChoice} from '../../models/question-types/multiple-choice.model';
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

export class QuestionTypeComponent implements OnInit, AfterViewInit {
  static questionsTF = new Array<TrueFalse>();
  static questionsFree = new Array<Free>();
  static questionsMC = new Array<MultipleChoice>();

  @ViewChild('newQuestion') questionType: ElementRef;
  private newSession: boolean;

  selectedTF = false;
  selectedMC = false;
  selectedFree = false;
  selectedNew = true;

  title: string;
  selectedRowNumber = -1;
  selectedSessionIndex: any;
  sessionPickerOptions: Array<string> = [];

  questionTypeInited = false;


  constructor(public prepareSessionService: PrepareSessionService, public mobileChecker: MobileChecker,
              protected renderer: Renderer2) {
    this.prepareSessionService = prepareSessionService;
  }



  ngOnInit(): void {
    QuestionTypeComponent.questionsTF = new Array<TrueFalse>();
    QuestionTypeComponent.questionsFree = new Array<Free>();
    QuestionTypeComponent.questionsMC = new Array<MultipleChoice>();
    this.getSessions();
  }

  ngAfterViewInit() {
    this.initDeviceType();
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
    this.selectedRowNumber = i;
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
    this.selectedRowNumber = -1;
  }

  onNewSessionSelection() {
    this.prepareSessionService.clearQuestions();
    this.onUpdate4();
    this.newSession = true;
    this.title = '';
    this.prepareSessionService.sessions.push(new Session('Neu', 'new'));
    this.selectedSessionIndex = this.prepareSessionService.sessions.length - 1;
    this.saveClickedRow(0);
  }

  clearSessionSelection() {
    this.selectedSessionIndex = undefined;
    this.prepareSessionService.questionsMC = [];
    this.prepareSessionService.questionsTF = [];
    this.prepareSessionService.questionsFree = [];
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
    if (this.newSession) {
      this.newSession = false;
    }
    this.saveClickedRow(-1);
    const session = this.prepareSessionService.sessions[this.selectedSessionIndex];
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
    });
  }

  saveSession() {
    const request = this.prepareSessionService.prepareRequest(
      this.prepareSessionService.questionsTF,
      this.prepareSessionService.questionsFree,
      this.prepareSessionService.questionsMC,
      this.title);
    this.prepareSessionService.sendRequest(request);
  }

  refresh(): void {
    // window.location.reload();

  }

  goBack(): void {
    window.history.back();
  }
}
