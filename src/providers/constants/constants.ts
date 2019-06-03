import { Injectable } from '@angular/core';

/*
  Generated class for the ConstantsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConstantsProvider {

  public HOST = "http://localhost:8100/upmscore/api";

  public SUBJECTS = "/subjects";
  public CREATE_SUBJECT = "/subjects/create";


  public SCHOOLS = "/upmapi/school";
  public PLANS = "/upmapi/plan";

  public TEACHERS = "/teachers";
  public FIND_ALL_BY_NAME = "/search/findAllByNameContaining";
  public FIND_BY_EMAIL = "/search/findByEmail";

  public FIND_ALL_BY_NAME_OR_SURNAME = "/search/findAllByNameContainingOrSurnameContaining";


  public EVALUATIONS = "/evaluations";

  public ASSINGMENTS = "/assingments";

  public STUDENTS = "/students";

  public UPM_SUBJECTS = "/upmSubjects";
  public UPM_SUBJECTS_EP = "/uPMSubjects";




}
