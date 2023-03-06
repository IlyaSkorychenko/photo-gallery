import { Injectable } from '@nestjs/common';
import { ConfigConnectorService } from '../config/config-connector.service';

@Injectable()
export class CognitoService {
  constructor(private configConnectorService: ConfigConnectorService) {}
  
}
