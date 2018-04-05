import numeral from 'numeral'

numeral.register('locale', 'cl', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal : function (number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: 'cCLP'
    }
});

// switch between locales
numeral.locale('cl')


export default numeral

export function formatcCLP(value) {
  return numeral(value).format('0,0')
}
