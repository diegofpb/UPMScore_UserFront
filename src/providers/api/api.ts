import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClientProvider} from "../client-http/clientHttp";
import {ConstantsProvider} from "../constants/constants";


@Injectable()
export class ApiProvider {

  constructor(public  client: HttpClientProvider,
              public constants: ConstantsProvider) {
  }

  getURL(url: string): Observable<any> {
    return this.client.get(url);
  }

  postEvaluationOfSubject(evaluation: any): Observable<any> {
    return this.client.postJson(this.constants.HOST + this.constants.EVALUATIONS,
      evaluation)
  }


  putPreviousEvaluationOfSubject(evaluation: any, previousEvaluationId: any): Observable<any> {
    return this.client.putJson(this.constants.HOST + this.constants.EVALUATIONS + "/" + previousEvaluationId,
      evaluation)
  }

  postAssingmentOfEvaluation(evaluation: any): Observable<any> {
    return this.client.postJson(this.constants.HOST + this.constants.ASSINGMENTS,
      evaluation)
  }

  deleteUrl(url: string): Observable<any> {
    return this.client.delete(url);
  }

  putPreviousAssingmentOfSubject(evaluationId: any, assingment: any, previousAssingmentId: any) {
    return this.client.putJson(this.constants.HOST + this.constants.ASSINGMENTS
      + "/" + previousAssingmentId,
      assingment)
  }

  uploadMultiPartFile(file: any, subjectId: String, upmSubjectPK: String): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('csvFile', file, file.name);

    return this.client.postMultiPart(this.constants.HOST + this.constants.SUBJECTS
    + "/create/" + subjectId + "/csv/" + upmSubjectPK, formData);
  }
}
