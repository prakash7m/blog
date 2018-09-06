import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { GlobalErrorHandler } from "../core/global-error-handler";
import { Observable } from "rxjs/Observable";
import { RowsResponse, HandledErrorResponse, DataResponse } from "../core/response.model";
import { GalleryModel } from "./gallery.model";
import { apiURL } from "../config";

@Injectable()
export class GalleryService {
  constructor(private http: HttpClient, private globalErrorHandler: GlobalErrorHandler) { }

  upload(sendableFormData: FormData) {
    return this.http.post(`${apiURL}/gallery`, sendableFormData, {
      withCredentials: true,
      reportProgress: true
    });
  }

  getGallery(): Observable<RowsResponse<GalleryModel> | HandledErrorResponse> {
    return this.http.get<RowsResponse<GalleryModel>>(`${apiURL}/gallery`, { withCredentials: true })
      .map((res: RowsResponse<GalleryModel>) => res)
      .catch((err: any, caught: Observable<RowsResponse<GalleryModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }

  addGallery(image: GalleryModel): Observable<DataResponse<GalleryModel> | HandledErrorResponse> {
    return this.http.post<DataResponse<GalleryModel>>(`${apiURL}/gallery`, image, { withCredentials: true })
      .map((res: DataResponse<GalleryModel>) => res)
      .catch((err: any, caught: Observable<DataResponse<GalleryModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }

  removeGallery(id: string): Observable<DataResponse<GalleryModel> | HandledErrorResponse> {
    return this.http.delete<DataResponse<GalleryModel>>(`${apiURL}/gallery/${id}`, { withCredentials: true })
      .map((res: DataResponse<GalleryModel>) => res)
      .catch((err: any, caught: Observable<DataResponse<GalleryModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }

  loadGallery(id: string): Observable<DataResponse<GalleryModel> | HandledErrorResponse> {
    return this.http.get<DataResponse<GalleryModel>>(`${apiURL}/gallery/${id}`, { withCredentials: true })
      .map((res: DataResponse<GalleryModel>) => res)
      .catch((err: any, caught: Observable<DataResponse<GalleryModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }

  editGallery(image: GalleryModel): Observable<DataResponse<GalleryModel> | HandledErrorResponse> {
    return this.http.put<DataResponse<GalleryModel>>(`${apiURL}/gallery/${image._id}`, image, { withCredentials: true })
      .map((res: DataResponse<GalleryModel>) => res)
      .catch((err: any, caught: Observable<DataResponse<GalleryModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }
}