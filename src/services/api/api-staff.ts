import axios from './api'
import config from './config'

import type { AxiosPromise } from 'axios'
import type { IDataTableQuery, IStaffPage } from '@/services/definitions'


const version = config.site.current_version
const url = `v${ version }/mngmt/mcstaff`

export class ApiStaff {

    /**
     * Request datatable page data according to the given query parameters
     * @param queryParams Parameterized request for the entities. Contains query params such as pagination details and filter options for searching.
     */
    public static reqStaffPage( queryParams: IDataTableQuery ): AxiosPromise<IStaffPage> {

        const payload = {
            Orderer: queryParams.Orderer,
            OrderDir: queryParams.OrderDir,
            Limit: queryParams.Limit,
            Search: queryParams.Search,
            Offset: queryParams.Offset,
            ...queryParams.Filters
        }

        return axios.get(url + '/page', { params: payload })
    }
}
