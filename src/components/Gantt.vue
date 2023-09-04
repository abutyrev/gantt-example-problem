<script setup>
import GSTC from "gantt-schedule-timeline-calendar";
import 'gantt-schedule-timeline-calendar/dist/style.css'
import { Plugin as TimelinePointer } from 'gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js'
import { Plugin as Selection } from 'gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js'
import { Plugin as ItemResizing } from 'gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js'
import { Plugin as ItemMovement } from 'gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js'
import {onMounted, ref} from "vue";
import {columnsFromDB, genItems, genRows} from "@/constants";
const config = {
  // for free key for your domain please visit https://gstc.neuronet.io/free-key
  // if you need commercial license please visit https://gantt-schedule-timeline-calendar.neuronet.io/pricing
  licenseKey:
      "====BEGIN LICENSE KEY====\\ngSvWWssNSz9Vxl6qa3QjDiR7Sn2C9bXvD6Vaxxta18Jor3DaXS9owsSbvJ9KP9jD5UXJZi/zUm5OjgKfEhjgjbErXPsprFnbt5je68WP9+juRnMqErhij8IKwyjmVMLmeV4KnDY8RjRtkbALodFQO3xo2fvraclBz/rZxcDOUR9skGd75/o3TB7NlNcK8TpKC8utvPzQkH7d3P9ihN4pLvssFhnGAOQoumddQBnt9DLYAbtpDEjwUZgqzJEpjG1MBrma6EYQP8C01p7cFGMU24aQjgNAo4cxacKlPEIe9KrZ9aoK/zSs1JOOTVf1/DU1pkUqlg54/hDyloZRkTKbWw==||U2FsdGVkX19cTxFXCUV37lk0HJpav/bsB1lxtbjLWrtDUtg9JP5dLfWw9tIVjU5aVPTKu8YCQW+SE84B1SgZ+zk/xglysSvZnEQ2Q4d2B2I=\\nWAJBwbpccSfDtVcuWcZy9COiUc/8nu/PmUhObTtG245qkobr0Dww0WDuq9UIRCa9ERn1GBFJ6AVCzCVBuezkSuQisBPBV5wcxfb++XMbyI+XL/eZ4tPJ0FPhKaPa2T0H7G1xEMnNKCBQfCAJ7gZ+Q8h6WGI7KlHMD40cEd+LFVXBSbyqwO5OWDXOZINYlib0M/E5lZx7R6DJUzi3rR/xkOfVJm7vSrqIx1a6owJvdIB0I9vwU3oGkRPdy5AgHgUnUCgSKndsiQ9tmoL6cV2h/SMBBfFxkJac2NZiru1Vu0V1j2xBbzq7ha/i2iMBsN3KaYvZ5bQmX4dSr2lD4+wDxA==\\n====END LICENSE KEY====",
  plugins: [
    TimelinePointer(),
    Selection({ enabled: true }),
    ItemResizing({ enabled: false }),
    ItemMovement({ enabled: false }),
  ],
  list: {
    columns: {
      data: GSTC.api.fromArray(columnsFromDB),
      resizer: { width: 0, dots: 0 }
    },
    toggle: { display: false },
    row: {
      height: 300
    },
    rows: GSTC.api.fromArray(genRows(20)),
  },
  chart: {
    item: {
      height: 56,
    },
    items: GSTC.api.fromArray(genItems(20)),
    spacing: { left: 3, right: 3 },
  },
  scroll: {
    vertical: {
      width: 30,
      byPixels: true,
      multiplier: 0.2
    },
    horizontal: {
      width: 30,
      byPixels: true,
    }
  }
};
const state = GSTC.api.stateFromConfig(config);

const gantt = ref(null)

function onClick() {
  const multi = state.multi(true)
  multi.update('config.plugin.ItemResizing.enabled', true)
  multi.update('config.plugin.ItemMovement.enabled', true)
  multi.done()
}

onMounted(() => {
  const app = GSTC({
    element: gantt.value,
    state,
  });
  console.log(app)
})
</script>

<template>
  <button @click="onClick">enable movement and resizing</button>
  <div ref="gantt" id="gantt"></div>
</template>

<style scoped>
#gantt {
  width: 100%
}
</style>
