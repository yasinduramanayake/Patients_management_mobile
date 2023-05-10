import moment from "moment";
import {statusWithColors} from '@/Constants/config'

export default {
    methods: {
        getErrorMessages(response, key) {
            return _.get(response, key)
        },
        getPrice(price) {
            return `£ ${parseFloat(price).toFixed(2)}`
        },
        removeLeadingZeorsFromReferences(reference) {
            let split_ref = _.split(reference, '-')
            if (split_ref.length === 1) return reference
            return `${split_ref[0]}-${parseInt(split_ref[1])}`
        },
        firstLetterUpperCase(value) {
            if (value === null) return 'N/A'
            return _.startCase(_.toLower(value))
        },
        getStatusWithColor(state) {
            return _.find(statusWithColors, {text: state})
        },
        makeUpperCase(value) {
            return _.startCase(_.toUpper(value))
        },
        //For time format
        momentFormat(value, arg) {
            return moment(value).format(arg)
        },
        momentTimestampFormat(value, arg) {
            return moment(new Date(value)).format(arg)
        },
        momentConvertToUTCAndReturn(value, arg) {
            return moment(new Date(moment.utc(value).format())).format(arg)
        },
        replaceNextDayDeliveryToMonday(delivery_types) {
            return delivery_types
            const today = moment().format('dddd')
            if (today !== 'Friday' && today !== 'Saturday' && today !== 'Sunday') return delivery_types
            delivery_types.forEach((single_delivery_type, index) => {
                let name = single_delivery_type.name
                if (name.includes('Next Day') && !name.includes('Standard')) {
                    if (delivery_types[index].is_cold_chain) delivery_types[index].name = delivery_types[index].name.replace('Next Day', 'Next Day (Tuesday)')
                    else delivery_types[index].name = delivery_types[index].name.replace('Next Day', 'Next Day (Monday)')
                }
            })
            return delivery_types
        },
        getFullName(tr) {
            if (!tr.first_name) return 'N/A'
            return _.startCase(_.toLower(`${tr.first_name} ${tr.last_name}`))
        },
        buildSingleAddress(x) {
          /*  buildSingleAddress(type, x) {*/
          /*  let address = `[${_.startCase(_.toLower(type))} Address] ${x.name}, ${x.address_line_1}`*/
            let address = `${x.name}, ${x.address_line_1}`

            if (x.address_line_2) address += `,${x.address_line_2}`
            if (x.address_line_3) address += `,${x.address_line_3}`

            address += `,${x.city}, ${x.post_code}`

            return address
        },

        //For time format ends
    }
}
