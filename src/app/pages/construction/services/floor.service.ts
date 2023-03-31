import {Injectable} from '@angular/core';
import {BaseService} from "../../../services/base/base.service";
import {BlockMertebeDto} from "../../../model/construction/blockMertebe.dto";

@Injectable({
  providedIn: 'root'
})
export class FloorService extends BaseService {

  updateFloor(floor: BlockMertebeDto) {
    return this.put<any>('/construction/api/v1/bina-block-mertebe', floor)
  }

}
